/*--------------------------------------------------------------
>>> POPUP:
----------------------------------------------------------------
# Skeleton
# Initialization
--------------------------------------------------------------*/

function updateFilterStorages(value, skeleton) {
	if (value === 'global') {
		//skeleton.dynamic_theme.storage = 'filters/dynamic-theme';
		skeleton.invert_colors.storage = 'filters/invert-colors';
		skeleton.bluelight.storage = 'filters/bluelight';
		skeleton.brightness.storage = 'filters/brightness';
		skeleton.contrast.storage = 'filters/contrast';
		skeleton.grayscale.storage = 'filters/grayscale';
	} else if (value !== '...') {
		//skeleton.dynamic_theme.storage = 'websites/' + value + '/filters/dynamic-theme';
		skeleton.invert_colors.storage = 'websites/' + value + '/filters/invert-colors';
		skeleton.bluelight.storage = 'websites/' + value + '/filters/bluelight';
		skeleton.brightness.storage = 'websites/' + value + '/filters/brightness';
		skeleton.contrast.storage = 'websites/' + value + '/filters/contrast';
		skeleton.grayscale.storage = 'websites/' + value + '/filters/grayscale';
	}
}

/*--------------------------------------------------------------
# SKELETON
--------------------------------------------------------------*/

var current_domain,
	skeleton = {
		component: 'base',

		header: {
			component: 'header',

			section_1: {
				component: 'section',
				variant: 'align-start',

				back: {
					component: 'button',
					attr: {
						'hidden': 'true'
					},
					on: {
						click: 'layers.back'
					},
					pluviam: true,

					svg: {
						component: 'svg',
						attr: {
							'viewBox': '0 0 24 24',
							'fill': 'none',
							'stroke-width': '1.5',
							'stroke': 'currentColor'
						},

						path: {
							component: 'path',
							attr: {
								'd': 'M14 18l-6-6 6-6'
							}
						}
					}
				},
				title: {
					component: 'span',
					variant: 'title'
				}
			},
			section_2: {
				component: 'section',
				variant: 'align-end',

				sun: {
					component: 'svg',
					attr: {
						'viewBox': '0 0 16 16',
						'width': '20',
						'height': '20',
						'fill': 'currentColor'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'M7.49 2a.5.5 0 0 0-.49.5v1a.5.5 0 1 0 1 0v-1a.5.5 0 0 0-.51-.5zM3.6 3.61a.5.5 0 0 0-.34.85l.7.71a.5.5 0 0 0 .86-.35.5.5 0 0 0-.15-.35l-.7-.71a.5.5 0 0 0-.37-.15zm7.77 0a.5.5 0 0 0-.33.15l-.71.7a.5.5 0 1 0 .7.71l.71-.7a.5.5 0 0 0 .15-.36.5.5 0 0 0-.52-.5zM7.46 5a3 3 0 0 0-2.08 5.12 3 3 0 0 0 4.24-4.24A3 3 0 0 0 7.46 5zM2 7.5a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm10 0a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm-7.7 3.18a.5.5 0 0 0-.34.15l-.7.7a.5.5 0 1 0 .7.71l.71-.7a.5.5 0 0 0 .15-.36.5.5 0 0 0-.52-.5zm6.38 0a.5.5 0 0 0-.35.86l.7.7a.5.5 0 0 0 .71 0 .5.5 0 0 0 .15-.35.5.5 0 0 0-.15-.35l-.7-.71a.5.5 0 0 0-.36-.15zM7.48 12a.5.5 0 0 0-.48.5v1a.5.5 0 1 0 1 0v-1a.5.5 0 0 0-.51-.5z'
						}
					}
				},
				power: {
					component: 'switch',
					value: true
				},
				moon: {
					component: 'svg',
					attr: {
						'viewBox': '0 0 16 16',
						'width': '20',
						'height': '20',
						'fill': 'currentColor'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'M7.5 4A4.5 4.5 0 0 0 3 8.5 4.5 4.5 0 0 0 7.5 13a4.5 4.5 0 0 0 4.201-2.905 3.938 3.938 0 0 1-.826.092A3.938 3.938 0 0 1 6.937 6.25a3.938 3.938 0 0 1 .704-2.243A4.5 4.5 0 0 0 7.5 4z'
						}
					}
				}
			}
		},
		layers: {
			component: 'layers',
			on: {
				open: function () {
					var skeleton = this.path[this.path.length - 1],
						parent = skeleton.parent,
						section = this.base.skeleton.header.section_1,
						section_2 = this.base.skeleton.header.section_2.rendered,
						is_home = this.path.length <= 1,
						title = 'Dark Mode';

					if (parent) {
						if (parent.label) {
							title = parent.label.text;
						} else if (parent.text) {
							title = parent.text;
						}
					}

					section.back.rendered.hidden = is_home;
					section.title.rendered.innerText = satus.locale.get(title);

					if (is_home === false) {
						section_2.style.visibility = 'hidden';
						section_2.style.pointerEvents = 'none';
					} else {
						section_2.style.visibility = '';
						section_2.style.pointerEvents = '';
					}
				}
			},

			toolbar: {},

			section: {
				component: 'section',
				variant: 'card',

				filters: {
					component: 'button',
					on: {
						click: {
							tabs: {
								component: 'tabs',
								on: {
									beforerender: function (target) {
										var item = (current_domain || '...');

										target.items = ['global', item];

										if (satus.storage.get('websites/' + current_domain + '/filters/global') === false) {
											target.value = item;
										}
									},
									change: function () {
										if (current_domain) {
											var container = this.skeleton.parent.section;

											satus.storage.set('websites/' + current_domain + '/filters/global', this.value === 'global');

											updateFilterStorages(this.value, container);

											satus.empty(container.rendered);

											satus.render(container, container.rendered, true);
										}
									}
								}
							},
							section: {
								component: 'section',
								variant: 'card',
								on: {
									beforerender: function (skeleton) {
										var value = satus.storage.get('websites/' + current_domain + '/filters/global'),
											path = 'global';

										if (value === false && current_domain) {
											path = current_domain;
										}

										updateFilterStorages(path, skeleton);
									}
								},

								dynamic_theme: {
									component: 'switch',
									text: 'dynamicTheme',
									on: {
										render: function () {
											var value = satus.storage.get('websites/' + current_domain + '/filters/global');

											if (value === false && current_domain) {
												this.dataset.value = satus.storage.get('websites/' + current_domain + '/filters/dynamic-theme');
											} else {
												this.dataset.value = satus.storage.get('filters/dynamic-theme');
											}
										},
										click: function () {
											if (this.dataset.value === 'true') {
												satus.render({
													component: 'modal',
													parent: this.skeleton,

													label: {
														component: 'span',
														text: 'thisIsAnExperimentalFeatureDoYouWantToActivateIt'
													},
													actions: {
														component: 'section',
														variant: 'actions',

														yes: {
															component: 'button',
															text: 'yes',
															on: {
																click: function () {
																	var modal = this.parentNode.parentNode.parentNode,
																		component = modal.skeleton.parent.rendered,
																		value = component.dataset.value === 'true';

																	if (satus.storage.get('websites/' + current_domain + '/filters/global') === false && current_domain) {
																		satus.storage.set('websites/' + current_domain + '/filters/dynamic-theme', value);
																	} else {
																		satus.storage.set('filters/dynamic-theme', value);
																	}

																	modal.close();
																}
															}
														},
														no: {
															component: 'button',
															text: 'no',
															on: {
																click: function () {
																	var modal = this.parentNode.parentNode.parentNode,
																		component = modal.skeleton.parent.rendered;

																	component.dataset.value = false;

																	modal.close();
																}
															}
														}
													}
												});
											} else {
												var value = this.dataset.value === 'true';

												if (satus.storage.get('websites/' + current_domain + '/filters/global') === false && current_domain) {
													satus.storage.set('websites/' + current_domain + '/filters/dynamic-theme', value);
												} else {
													satus.storage.set('filters/dynamic-theme', value);
												}
											}
										}
									}
								},
								invert_colors: {
									component: 'switch',
									text: 'invertColors',
									value: true
								},
								bluelight: {
									component: 'slider',
									text: 'bluelight',
									max: 100
								},
								brightness: {
									component: 'slider',
									text: 'brightness',
									max: 100,
									value: 100
								},
								contrast: {
									component: 'slider',
									text: 'contrast',
									max: 100,
									value: 100
								},
								grayscale: {
									component: 'slider',
									text: 'grayscale',
									max: 100
								}
							}
						}
					},

					icon: {
						component: 'svg',
						attr: {
							'viewBox': '0 0 24 24',
							'fill': 'var(--satus-primary)'
						},

						path: {
							component: 'path',
							attr: {
								'd': 'M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1 0 11.32 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76a5.95 5.95 0 0 1 0-8.48L12 5.1v14.49z'
							}
						}
					},
					label: {
						component: 'span',
						text: 'filters'
					}
				},
				styles: {
					component: 'button',
					on: {
						click: {
							column: {
								component: 'section',
								variant: 'column',

								tabs: {
									component: 'tabs',
									on: {
										beforerender: function (target) {
											var item = (current_domain || '...');

											target.items = ['global', item];
										},
										change: function () {
											var value = this.value,
												textfield = this.skeleton.parent.section.textfield;

											if (value === 'global') {
												textfield.storage = 'styles';
											} else if (value !== '...') {
												textfield.storage = 'websites/' + value + '/styles';
											}

											satus.empty(textfield.parent.rendered);

											satus.render(textfield.parent, textfield.parent.rendered, true);
										}
									}
								},
								section: {
									component: 'section',
									variant: 'styles',

									textfield: {
										component: 'textarea',
										storage: 'styles',
										properties: {
											placeholder: 'html, body { ... }'
										},
										on: {
											render: function () {
												this.value = satus.storage.get(this.skeleton.storage) || '';
											},
											keydown: function () {
												var self = this;

												setTimeout(function () {
													satus.storage.set(self.skeleton.storage, self.value);
												});
											}
										}
									}
								}
							}
						}
					},

					icon: {
						component: 'svg',
						attr: {
							'viewBox': '0 0 24 24',
							'fill': 'var(--satus-primary)'
						},

						path: {
							component: 'path',
							attr: {
								'd': 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'
							}
						}
					},
					label: {
						component: 'span',
						text: 'styles'
					}
				},
				websites: {
					component: 'button',
					on: {
						click: {
							section: {
								component: 'section',
								variant: 'card',
								on: {
									render: function () {
										var websites = satus.storage.get('websites') || {};

										if (Object.keys(websites).length > 0) {
											for (var key in websites) {
												satus.render({
													component: 'div',
													variant: 'website-item',
													properties: {
														key
													},

													settings: {
														component: 'button',
														variant: 'favicon',
														on: {
															click: {
																component: 'section',
																variant: 'card',

																filters: {
																	component: 'button',
																	on: {
																		click: {
																			section: {
																				component: 'section',
																				variant: 'card',

																				dynamic_theme: {
																					component: 'switch',
																					text: 'dynamicTheme',
																					storage: 'websites/' + key + '/filters/dynamic-theme'
																				},
																				invert_colors: {
																					component: 'switch',
																					text: 'invertColors',
																					value: true,
																					storage: 'websites/' + key + '/filters/invert-colors'
																				},
																				bluelight: {
																					component: 'slider',
																					text: 'bluelight',
																					max: 100,
																					storage: 'websites/' + key + '/filters/bluelight'
																				},
																				brightness: {
																					component: 'slider',
																					text: 'brightness',
																					max: 100,
																					value: 100,
																					storage: 'websites/' + key + '/filters/brightness'
																				},
																				contrast: {
																					component: 'slider',
																					text: 'contrast',
																					max: 100,
																					value: 100,
																					storage: 'websites/' + key + '/filters/contrast'
																				},
																				grayscale: {
																					component: 'slider',
																					text: 'grayscale',
																					max: 100,
																					storage: 'websites/' + key + '/filters/grayscale'
																				}
																			}
																		}
																	},

																	icon: {
																		component: 'svg',
																		attr: {
																			'viewBox': '0 0 24 24',
																			'fill': 'var(--satus-primary)'
																		},

																		path: {
																			component: 'path',
																			attr: {
																				'd': 'M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1 0 11.32 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76a5.95 5.95 0 0 1 0-8.48L12 5.1v14.49z'
																			}
																		}
																	},
																	label: {
																		component: 'span',
																		text: 'filters'
																	}
																},
																styles: {
																	component: 'button',
																	on: {
																		click: {
																			column: {
																				component: 'section',
																				variant: 'column',

																				section: {
																					component: 'section',
																					variant: 'styles',

																					textfield: {
																						component: 'textarea',
																						storage: 'websites/' + key + '/styles',
																						properties: {
																							placeholder: 'html, body { ... }'
																						},
																						on: {
																							render: function () {
																								this.value = satus.storage.get(this.skeleton.storage) || '';
																							},
																							keydown: function () {
																								var self = this;

																								setTimeout(function () {
																									satus.storage.set(self.skeleton.storage, self.value);
																								});
																							}
																						}
																					}
																				}
																			}
																		}
																	},

																	icon: {
																		component: 'svg',
																		attr: {
																			'viewBox': '0 0 24 24',
																			'fill': 'var(--satus-primary)'
																		},

																		path: {
																			component: 'path',
																			attr: {
																				'd': 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'
																			}
																		}
																	},
																	label: {
																		component: 'span',
																		text: 'styles'
																	}
																}
															}
														},

														favicon: {
															component: 'img',
															properties: {
																src: 'chrome://favicon/https://' + key
															}
														},
														label: {
															component: 'span',
															text: key.replace('www.', '')
														}
													},
													delete: {
														component: 'button',
														variant: 'delete',
														attr: {
															'title': 'delete'
														},
														on: {
															click: {
																component: 'modal',

																label: {
																	component: 'span',
																	text: 'areYouSureYouWantToDeleteTheSelectedWebsiteSettings'
																},
																action: {
																	component: 'section',
																	variant: 'actions',

																	ok: {
																		component: 'button',
																		text: 'OK',
																		on: {
																			click: function () {
																				var modal = this.parentNode.parentNode.parentNode,
																					component = modal.skeleton.parent.parent.rendered;

																				delete satus.storage.data.websites[component.key];

																				satus.storage.set('websites', satus.storage.data.websites);

																				component.remove();

																				modal.close();
																			}
																		}
																	},
																	cancel: {
																		component: 'button',
																		text: 'cancel',
																		on: {
																			click: function () {
																				this.parentNode.parentNode.parentNode.close();
																			}
																		}
																	}
																}
															}
														},

														icon: {
															component: 'svg',
															attr: {
																'viewBox': '0 0 24 24',
																'fill': 'currentColor'
															},

															path: {
																component: 'path',
																attr: {
																	'd': 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'
																}
															}
														}
													}
												}, this);
											}
										} else {
											satus.render({
												component: 'span',
												text: 'theListIsEmpty'
											}, this);
										}
									}
								}
							}
						}
					},

					icon: {
						component: 'svg',
						attr: {
							'viewBox': '0 0 24 24',
							'fill': 'var(--satus-primary)'
						},

						path: {
							component: 'path',
							attr: {
								'd': 'M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z'
							}
						}
					},
					label: {
						component: 'span',
						text: 'websites'
					}
				},
				schedule: {
					component: 'button',
					on: {
						click: {
							section: {
								component: 'section',
								variant: 'card',

								schedule: {
									component: 'select',
									text: 'schedule',

									options: [{
										text: 'disabled',
										value: 'disabled'
									}, {
										text: 'sunsetToSunrise',
										value: 'sunset_to_sunrise'
									}, {
										text: 'systemPeference',
										value: 'system_peference'
									}]
								},
								time_from: {
									component: 'select',
									text: 'timeFrom',
									options: [{
										text: '00:00',
										value: '00:00'
									}, {
										text: '01:00',
										value: '01:00'
									}, {
										text: '02:00',
										value: '02:00'
									}, {
										text: '03:00',
										value: '03:00'
									}, {
										text: '04:00',
										value: '04:00'
									}, {
										text: '05:00',
										value: '05:00'
									}, {
										text: '06:00',
										value: '06:00'
									}, {
										text: '07:00',
										value: '07:00'
									}, {
										text: '08:00',
										value: '08:00'
									}, {
										text: '09:00',
										value: '09:00'
									}, {
										text: '10:00',
										value: '10:00'
									}, {
										text: '11:00',
										value: '11:00'
									}, {
										text: '12:00',
										value: '12:00'
									}, {
										text: '13:00',
										value: '13:00'
									}, {
										text: '14:00',
										value: '14:00'
									}, {
										text: '15:00',
										value: '15:00'
									}, {
										text: '16:00',
										value: '16:00'
									}, {
										text: '17:00',
										value: '17:00'
									}, {
										text: '18:00',
										value: '18:00'
									}, {
										text: '19:00',
										value: '19:00'
									}, {
										text: '20:00',
										value: '20:00'
									}, {
										text: '21:00',
										value: '21:00'
									}, {
										text: '22:00',
										value: '22:00'
									}, {
										text: '23:00',
										value: '23:00'
									}]
								},
								time_to: {
									component: 'select',
									text: 'timeTo',
									options: [{
										text: '00:00',
										value: '00:00'
									}, {
										text: '01:00',
										value: '01:00'
									}, {
										text: '02:00',
										value: '02:00'
									}, {
										text: '03:00',
										value: '03:00'
									}, {
										text: '04:00',
										value: '04:00'
									}, {
										text: '05:00',
										value: '05:00'
									}, {
										text: '06:00',
										value: '06:00'
									}, {
										text: '07:00',
										value: '07:00'
									}, {
										text: '08:00',
										value: '08:00'
									}, {
										text: '09:00',
										value: '09:00'
									}, {
										text: '10:00',
										value: '10:00'
									}, {
										text: '11:00',
										value: '11:00'
									}, {
										text: '12:00',
										value: '12:00'
									}, {
										text: '13:00',
										value: '13:00'
									}, {
										text: '14:00',
										value: '14:00'
									}, {
										text: '15:00',
										value: '15:00'
									}, {
										text: '16:00',
										value: '16:00'
									}, {
										text: '17:00',
										value: '17:00'
									}, {
										text: '18:00',
										value: '18:00'
									}, {
										text: '19:00',
										value: '19:00'
									}, {
										text: '20:00',
										value: '20:00'
									}, {
										text: '21:00',
										value: '21:00'
									}, {
										text: '22:00',
										value: '22:00'
									}, {
										text: '23:00',
										value: '23:00'
									}]
								}
							}
						}
					},

					icon: {
						component: 'svg',
						attr: {
							'viewBox': '0 0 24 24',
							'fill': 'var(--satus-primary)'
						},

						path_1: {
							component: 'path',
							attr: {
								'd': 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
							}
						},
						path_2: {
							component: 'path',
							attr: {
								'd': 'M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z'
							}
						}
					},
					label: {
						component: 'span',
						text: 'schedule'
					}
				},
				settings: {
					component: 'button',
					on: {
						click: {
							section: {
								component: 'section',
								variant: 'card',

								appearance: {
									component: 'button',
									on: {
										click: {
											section: {
												component: 'section',
												variant: 'card',

												hide_made_with_love: {
													component: 'switch',
													text: 'hideMadeWithLove',
													storage: 'hide-made-with-love'
												}
											}
										}
									},

									svg: {
										component: 'svg',
										attr: {
											'viewBox': '0 0 24 24',
											'fill': 'currentColor'
										},

										path: {
											component: 'path',
											attr: {
												'd': 'M7 16c.6 0 1 .5 1 1a2 2 0 0 1-2 2h-.5a4 4 0 0 0 .5-2c0-.6.5-1 1-1M18.7 3a1 1 0 0 0-.7.3l-9 9 2.8 2.7 9-9c.3-.4.3-1 0-1.4l-1.4-1.3a1 1 0 0 0-.7-.3zM7 14a3 3 0 0 0-3 3c0 1.3-1.2 2-2 2 1 1.2 2.5 2 4 2a4 4 0 0 0 4-4 3 3 0 0 0-3-3z'
											}
										}
									},
									label: {
										component: 'span',
										text: 'appearance'
									}
								},
								languages: {
									component: 'button',
									on: {
										click: {
											section: {
												component: 'section',
												variant: 'card',

												language: {
													text: 'language',
													component: 'select',
													on: {
														change: function (name, value) {
															var self = this;

															satus.ajax('_locales/' + this.querySelector('select').value + '/messages.json', function (response) {
																try {
																	response = JSON.parse(response);

																	for (var key in response) {
																		satus.locale.strings[key] = response[key].message;
																	}

																	self.base.skeleton.header.section_1.title.rendered.textContent = satus.locale.get('languages');

																	self.base.skeleton.layers.rendered.update();
																} catch (error) {
																	console.log(error);
																	//close();
																}
															});
														}
													},
													options: [{
														value: 'en',
														text: 'English'
													}, {
														value: 'ko',
														text: '한국어'
													}, {
														value: 'es',
														text: 'Español (España)'
													}, {
														value: 'ru',
														text: 'Русский'
													}, {
														value: 'de',
														text: 'Deutsch'
													}, {
														value: 'zh_TW',
														text: '中文 (繁體)'
													}, {
														value: 'pt_PT',
														text: 'Português'
													}, {
														value: 'pt_BR',
														text: 'Português (Brasil)'
													}, {
														value: 'zh_CN',
														text: '中文 (简体)'
													}, {
														value: 'fr',
														text: 'Français'
													}, {
														value: 'ja',
														text: '日本語'
													}, {
														value: 'tr',
														text: 'Türkçe'
													}, {
														value: 'tr',
														text: 'Italiano'
													}, {
														value: 'nl',
														text: 'Nederlands'
													}, {
														value: 'ar',
														text: 'العربية'
													}, {
														value: 'id',
														text: 'Bahasa Indonesia'
													}, {
														value: 'nb',
														text: 'Norsk'
													}, {
														value: 'nb_NO',
														text: 'Norsk (Bokmål)'
													}, {
														value: 'el',
														text: 'Ελληνικά'
													}, {
														value: 'bn',
														text: 'বাংলা'
													}, {
														value: 'hin',
														text: 'हिन्दी'
													}, {
														value: 'sk',
														text: 'Slovenčina'
													}, {
														value: 'pl',
														text: 'Polski'
													}]
												}
											}
										}
									},

									svg: {
										component: 'svg',
										attr: {
											'viewBox': '0 0 24 24',
											'fill': 'currentColor'
										},

										path: {
											component: 'path',
											attr: {
												'd': 'M12.9 15l-2.6-2.4c1.8-2 3-4.2 3.8-6.6H17V4h-7V2H8v2H1v2h11.2c-.7 2-1.8 3.8-3.2 5.3-1-1-1.7-2.1-2.3-3.3h-2c.7 1.6 1.7 3.2 3 4.6l-5.1 5L4 19l5-5 3.1 3.1.8-2zm5.6-5h-2L12 22h2l1.1-3H20l1.1 3h2l-4.5-12zm-2.6 7l1.6-4.3 1.6 4.3H16z'
											}
										}
									},
									label: {
										component: 'span',
										text: 'languages'
									}
								},
								backup_and_reset: {
									component: 'button',
									on: {
										click: {
											section: {
												component: 'section',
												variant: 'card',

												import_settings: {
													component: 'button',
													text: 'importSettings',
													on: {
														click: function () {
															chrome.tabs.create({
																url: 'options.html?action=import'
															});
														}
													}
												},
												export_settings: {
													component: 'button',
													text: 'exportSettings',

													on: {
														click: function () {
															chrome.tabs.create({
																url: 'options.html?action=export'
															});
														}
													}
												},
												reset_all_settings: {
													component: 'button',
													text: 'resetAllSettings',
													on: {
														click: function () {
															satus.render({
																component: 'modal',
																class: 'satus-modal--confirm',

																label: {
																	component: 'span',
																	text: 'thisWillResetAllSettings'
																},
																actions: {
																	component: 'section',
																	variant: 'actions',

																	ok: {
																		component: 'button',
																		text: 'ok',
																		on: {
																			click: function () {
																				satus.storage.clear();

																				this.parentNode.parentNode.parentNode.close();
																			}
																		}
																	},
																	cancel: {
																		component: 'button',
																		text: 'cancel',
																		on: {
																			click: function () {
																				this.parentNode.parentNode.parentNode.close();
																			}
																		}
																	}
																}
															});
														}
													}
												}
											}
										}
									},

									svg: {
										component: 'svg',
										attr: {
											'viewBox': '0 0 24 24',
											'fill': 'currentColor'
										},

										path: {
											component: 'path',
											attr: {
												'd': 'M13.3 3A9 9 0 0 0 4 12H2.2c-.5 0-.7.5-.3.8l2.7 2.8c.2.2.6.2.8 0L8 12.8c.4-.3.1-.8-.3-.8H6a7 7 0 1 1 2.7 5.5 1 1 0 0 0-1.3.1 1 1 0 0 0 0 1.5A9 9 0 0 0 22 11.7C22 7 18 3.1 13.4 3zm-.6 5c-.4 0-.7.3-.7.8v3.6c0 .4.2.7.5.9l3.1 1.8c.4.2.8.1 1-.2.2-.4.1-.8-.2-1l-3-1.8V8.7c0-.4-.2-.7-.7-.7z'
											}
										}
									},
									label: {
										component: 'span',
										text: 'backupAndReset'
									}
								},
								date_and_time: {
									component: 'button',
									on: {
										click: {
											section: {
												component: 'section',
												variant: 'card',

												use_24_hour_format: {
													component: 'switch',
													text: 'use24HourFormat',
													value: true
												}
											}
										}
									},

									svg: {
										component: 'svg',
										attr: {
											'viewBox': '0 0 24 24',
											'fill': 'currentColor'
										},

										path: {
											component: 'path',
											attr: {
												'd': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-.2-13c-.5 0-.8.3-.8.7v4.7c0 .4.2.7.5.9l4.1 2.5c.4.2.8 0 1-.3.2-.3.1-.7-.2-1l-3.9-2.2V7.7c0-.4-.3-.7-.7-.7z'
											}
										}
									},
									label: {
										component: 'span',
										text: 'dateAndTime'
									}
								},
								about: {
									component: 'button',
									on: {
										click: {
											component: 'span',

											on: {
												render: function () {
													var component = this,
														manifest = chrome.runtime.getManifest(),
														user = satus.user(),
														skeleton_about = {
															extension_section_label: {
																component: 'span',
																class: 'satus-section--label',
																text: 'extension'
															},
															extension_section: {
																component: 'section',
																variant: 'card',

																list: {
																	component: 'list',
																	items: [
																		['version', manifest.version],
																		['permissions', manifest.permissions.join(', ').replace('https://www.youtube.com/', 'YouTube')]
																	]
																}
															},
															browser_section_label: {
																component: 'span',
																class: 'satus-section--label',
																text: 'browser'
															},
															browser_section: {
																component: 'section',
																variant: 'card',

																list: {
																	component: 'list',
																	items: [
																		['name', user.browser.name],
																		['version', user.browser.version],
																		['platform', user.browser.platform],
																		['videoFormats', {
																			component: 'span',
																			on: {
																				render: function () {
																					var formats = [];

																					for (var key in user.browser.video) {
																						if (user.browser.video[key] !== false) {
																							formats.push(key);
																						}
																					}

																					this.textContent = formats.join(', ');
																				}
																			}
																		}],
																		['audioFormats', {
																			component: 'span',
																			on: {
																				render: function () {
																					var formats = [];

																					for (var key in user.browser.audio) {
																						if (user.browser.audio[key] !== false) {
																							formats.push(key);
																						}
																					}

																					this.textContent = formats.join(', ');
																				}
																			}
																		}],
																		['flash', !!user.browser.flash ? 'true' : 'false']
																	]
																}
															},
															os_section_label: {
																component: 'span',
																class: 'satus-section--label',
																text: 'os'
															},
															os_section: {
																component: 'section',
																variant: 'card',

																list: {
																	component: 'list',
																	items: [
																		['name', user.os.name],
																		['type', user.os.type]
																	]
																}
															},
															device_section_label: {
																component: 'span',
																class: 'satus-section--label',
																text: 'device'
															},
															device_section: {
																component: 'section',
																variant: 'card',

																list: {
																	component: 'list',
																	items: [
																		['screen', user.device.screen],
																		['cores', user.device.cores],
																		['gpu', user.device.gpu],
																		['ram', user.device.ram]
																	]
																}
															}
														};

													setTimeout(function () {
														satus.render(skeleton_about, component.parentNode);

														component.remove();
													});
												}
											}
										}
									},

									svg: {
										component: 'svg',
										attr: {
											'viewBox': '0 0 24 24',
											'fill': 'currentColor'
										},

										path: {
											component: 'path',
											attr: {
												'd': 'M11 7h2v2h-2zm0 4h2v6h-2zm1-9a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z'
											}
										}
									},
									label: {
										component: 'span',
										text: 'about'
									}
								}
							}
						}
					},

					icon: {
						component: 'svg',
						attr: {
							'viewBox': '0 0 24 24',
							'fill': 'var(--satus-primary)'
						},

						path: {
							component: 'path',
							attr: {
								'd': 'M19.4 13l.1-1v-1l2-1.6c.2-.2.3-.5.2-.7l-2-3.4c-.2-.3-.4-.3-.6-.3l-2.5 1-1.7-1-.4-2.6c0-.2-.3-.4-.5-.4h-4c-.3 0-.5.2-.5.4l-.4 2.7c-.6.2-1.1.6-1.7 1L5 5c-.2-.1-.4 0-.6.2l-2 3.4c0 .3 0 .5.2.7l2 1.6a8 8 0 0 0 0 2l-2 1.6c-.2.2-.3.5-.2.7l2 3.4c.2.3.4.3.6.3l2.5-1 1.7 1 .4 2.6c0 .2.2.4.5.4h4c.3 0 .5-.2.5-.4l.4-2.7c.6-.2 1.1-.6 1.7-1l2.5 1c.2.1.4 0 .6-.2l2-3.4c0-.2 0-.5-.2-.7l-2-1.6zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z'
							}
						}
					},
					label: {
						component: 'span',
						text: 'settings'
					}
				}
			},

			made_with_love: {
				component: 'a',
				class: 'made-with-love',
				attr: {
					target: '_blank',
					href: 'https://chrome.google.com/webstore/detail/improve-youtube-open-sour/bnomihfieiccainjcjblhegjgglakjdd'
				},

				span_1: {
					component: 'span',
					text: 'Made with'
				},
				svg: {
					component: 'svg',
					attr: {
						'viewBox': '0 0 24 24',
						'fill': '#a72525'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z'
						}
					}
				},
				span_2: {
					component: 'span',
					text: 'by ImprovedTube'
				}
			}
		}
	};


/*--------------------------------------------------------------
# INITIALIZATION
--------------------------------------------------------------*/

satus.storage.attributes = {
	'hide-made-with-love': true
};

function modalError(string) {
	satus.render({
    	component: 'modal',

    	label: {
    		component: 'span',
    		text: string
    	},
    	actions: {
    		component: 'section',
    		variant: 'actions',

    		ok: {
				component: 'button',
				text: 'ok',
				on: {
					click: function () {
						this.parentNode.parentNode.parentNode.close();
					}
				}
			},
			cancel: {
				component: 'button',
				text: 'cancel',
				on: {
					click: function () {
						this.parentNode.parentNode.parentNode.close();
					}
				}
			}
    	}
    });
}

satus.storage.import(function (items) {
	var language = items.language || window.navigator.language || 'en';

	satus.ajax('_locales/' + language + '/messages.json', function (response) {
		try {
			response = JSON.parse(response);

			for (var key in response) {
				satus.locale.strings[key] = response[key].message;
			}
		} catch (error) {
			console.error(error);
		}

		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				action: 'init'
			}, function (response) {
				current_domain = response;

				skeleton.layers.toolbar.text = response || '';

				if (!response) {
					skeleton.layers.toolbar = {
						component: 'alert',
						text: 'somethingWentWrongTryReloadingThePage',
						variant: 'error'
					};
				} else {
					skeleton.layers.toolbar = {
						component: 'switch',
						class: 'satus-switch--domain',
						text: response,
						storage: 'websites/' + response + '/active',
						value: true
					};
				}

				satus.render(skeleton);

				if (location.href.indexOf('action=import') !== -1) {
	                satus.render({
				    	component: 'modal',

				    	label: {
				    		component: 'span',
				    		text: 'areYouSureYouWantToImportTheData'
				    	},
				    	actions: {
				    		component: 'section',
				    		variant: 'actions',

				    		ok: {
								component: 'button',
								text: 'ok',
								on: {
									click: function () {
										var input = document.createElement('input');

						                input.type = 'file';

						                input.addEventListener('change', function () {
						                    var file_reader = new FileReader();

						                    file_reader.onload = function () {
						                        var data = JSON.parse(this.result);

						                        for (var key in data) {
						                            satus.storage.set(key, data[key]);
						                        }

						                        close();
						                    };

						                    file_reader.readAsText(this.files[0]);
						                });

						                input.click();

										this.parentNode.parentNode.parentNode.close();
									}
								}
							},
							cancel: {
								component: 'button',
								text: 'cancel',
								on: {
									click: function () {
										this.parentNode.parentNode.parentNode.close();
									}
								}
							}
				    	}
				    });
	            } else if (location.href.indexOf('action=export') !== -1) {
	                var blob;

	                try {
	                	new Blob([JSON.stringify(satus.storage.data)], {
					        type: 'application/json;charset=utf-8'
					    });
	                } catch (error) {
	                	return modalError(error);
	                }

				    satus.render({
				    	component: 'modal',

				    	label: {
				    		component: 'span',
				    		text: 'areYouSureYouWantToExportTheData'
				    	},
				    	actions: {
				    		component: 'section',
				    		variant: 'actions',

				    		ok: {
								component: 'button',
								text: 'ok',
								on: {
									click: function () {
										try {
											chrome.permissions.request({
							                    permissions: ['downloads']
							                }, function (granted) {
							                    if (granted) {
							                        chrome.downloads.download({
							                            url: URL.createObjectURL(blob),
							                            filename: 'dark-mode.json',
							                            saveAs: true
							                        }, function () {
							                            setTimeout(function () {
							                            	close();
							                            }, 1000);
							                        });
							                    }
							                });
							            } catch (error) {
						                	return modalError(error);
						                }

										this.parentNode.parentNode.parentNode.close();
									}
								}
							},
							cancel: {
								component: 'button',
								text: 'cancel',
								on: {
									click: function () {
										this.parentNode.parentNode.parentNode.close();
									}
								}
							}
				    	}
				    });
	            }
			});
		});
	}, function (success) {
		satus.ajax('_locales/en/messages.json', success);
	});
});