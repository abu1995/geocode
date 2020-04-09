from tethys_sdk.base import TethysAppBase, url_map_maker


class Geocode(TethysAppBase):
    """
    Tethys app class for Geocode.
    """

    name = 'Geocode'
    index = 'geocode:home'
    icon = 'geocode/images/icon.gif'
    package = 'geocode'
    root_url = 'geocode'
    color = '#000000'
    description = 'An app to georeference inp files'
    tags = 'Pipes, EPANET'
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='home',
                url='geocode',
                controller='geocode.controllers.home'
            ),
        )

        return url_maps